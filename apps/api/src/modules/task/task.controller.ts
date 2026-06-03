import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import prisma from "../../config/prisma";

// ✅ 1. FETCH ALL USER TASKS
export const getTasks =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const userId =
        req.user?.userId as string;

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized session context missing",

        });

      }

      // Start of today
      const startOfDay =
        new Date();

      startOfDay.setHours(
        0,
        0,
        0,
        0
      );

      // End of today
      const endOfDay =
        new Date();

      endOfDay.setHours(
        23,
        59,
        59,
        999
      );

      // Fetch ONLY today's tasks
      const tasks =
        await prisma.task.findMany({

          where: {

            userId,

            createdAt: {

              gte:
                startOfDay,

              lte:
                endOfDay,

            },

          },

          orderBy: {

            createdAt:
              "asc",

          },

        });

      return res.status(200).json({

        success: true,

        tasks,

      });

    }

  );

// ✅ 2. CREATE A NEW TASK
export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.user?.userId as string;;
  const { title } = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized session context missing" });
  }

  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Task title context content required" });
  }

  const newTask = await prisma.task.create({
    data: {
      title: title.trim(),
      userId,
    },
  });

  return res.status(201).json({
    success: true,
    task: newTask, // ◄── MATCHES FRONTEND DISPATCH EXACTLY
  });
});

// ✅ 3. TOGGLE COMPLETED CHECKBOX CHECKLIST STATUS
export const toggleTaskStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

const taskId =
  req.params.id as string;

const targetTask =
  await prisma.task.findFirst({

    where: {

      id: taskId,

      userId:
        req.user?.userId as string,

    },

  });
  if (!targetTask) {
    return res.status(404).json({ success: false, message: "Target task row registry missing" });
  }

 const updatedTask =
  await prisma.task.update({

    where: {

      id: taskId,

    },

    data: {

      done:
        !targetTask.done,

    },

  });

  return res.status(200).json({
    success: true,
    task: updatedTask,
  });
});

// ✅ 4. DELETE TASK PERMANENTLY
export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const taskId = req.params.id as string;

  const targetTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: req.user?.userId as string,
    },
  });

  if (!targetTask) {
    return res.status(404).json({ success: false, message: "Target task row registry missing" });
  }

  await prisma.task.delete({ where: { id: taskId } });

  return res.status(200).json({
    success: true,
    message: "Task wiped successfully",
  });
});