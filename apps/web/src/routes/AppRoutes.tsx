import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

// Core General & Shared Auth Framework Layouts
import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Onboarding from "../pages/student/Onboarding";
import RoleProtectedRoute from "./RoleProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Student Workspace Panels
import Dashboard from "../pages/student/Dashboard";
import Subscriptions from "../pages/student/Subscriptions";
import Analytics from "../pages/student/Analytics";
import Tests from "../pages/Admin/Tests/Tests";
import Leaderboard from "../pages/student/Leaderboard";
import Achievements from "../pages/student/Achievements";
import Community from "../pages/student/Community";
import Sessions from "../pages/mentor/Sessions";
import About from "../pages/About/About";

import MentorOnboarding
from "../pages/mentor/MentorOnboarding";

import UnderReview
from "../pages/mentor/UnderReview";

import MentorDashboard
from "../pages/mentor/MentorDashboard";

import Rejected
from "../pages/mentor/Rejected";

import MentorProtectedRoute
from "./MentorProtectedRoute";

import MentorLayout from "../layouts/MentorLayout";
import Subjects from "../pages/Admin/Subjects/Subjects";
import Lectures from "../pages/mentor/Lectures";
import Availability from "../pages/mentor/Availability";
import BookSession from "../pages/student/BookSession";
import MentorProfile from "../pages/student/MentorProfile";
import MySessions from "../pages/student/MySessions";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminMentors from "../pages/Admin/Mentors";
import AdminStudents from "../pages/Admin/Students";
import PracticeQuestions from "../pages/Admin/Problems";
import PracticeProblems from "../pages/student/PracticeProblems";
import Plans from "../pages/Admin/Plans";
import Profile from "../pages/student/Profile";
import MentorDashboardProfile from "../pages/mentor/MentorDashboardProfile";
import Chapters from "../pages/Admin/Chapters/Chapters";
import Questions from "../pages/Admin/Questions/Questions";
import CreateQuestion from "../pages/Admin/Questions/CreateQuestion";
import EditQuestion from "../pages/Admin/Questions/EditQuestion";
import CreateTest from "../pages/Admin/Tests/CreateTest";
import EditTest from "../pages/Admin/Tests/EditTest";
import TestBuilder from "../pages/Admin/Tests/TestBuilder";




function AppRoutes() {

  const user =
    useAuthStore(
      (state) => state.user
    );

  return (

    <Routes>

      {/* 🌐 Public Routes */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
  path="/about"
  element={<About />}
/>

      <Route
  path="/signup"
  element={<Signup />}
/>

     <Route
  path="/login"
  element={<Login />}
/>

{/* Admin Routes */}

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={<AdminLayout />}
>

  <Route
    path="dashboard"
    element={<AdminDashboard />}
  />

  <Route
    path="subjects"
    element={<Subjects />}
  />

  <Route
  path="chapters"
  element={<Chapters />}
/>

<Route
  path="questions"
  element={<Questions />}
/>
<Route
  path="questions/create"
  element={<CreateQuestion />}
/>

<Route
  path="questions/:questionId/edit"
  element={<EditQuestion />}
/>

<Route
  path="tests"
  element={<Tests />}
/>

<Route
  path="tests/create"
  element={<CreateTest />}
/>

<Route
    path="tests/:testId/edit"
    element={<EditTest />}
  />

   <Route
    path="tests/:testId/builder"
    element={<TestBuilder />}
  />


  <Route
    path="mentors"
    element={<AdminMentors />}
  />

  <Route
    path="students"
    element={<AdminStudents />}
  />

  <Route
    path="problems"
    element={<PracticeQuestions />}
  />

  <Route
    path="plans"
    element={<Plans />}
  />

</Route>
    {/* ==========================================
    MENTOR ROUTES
========================================== */}

{/* ==========================================
MENTOR ROUTES
========================================== */}

<Route
  path="/mentor/onboarding"
  element={
    <RoleProtectedRoute
      allowedRole="MENTOR"
    >
      <MentorOnboarding />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/mentor/under-review"
  element={
    <RoleProtectedRoute
      allowedRole="MENTOR"
    >
      <UnderReview />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/mentor/rejected"
  element={
    <RoleProtectedRoute
      allowedRole="MENTOR"
    >
      <Rejected />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/mentor"
  element={
    <MentorProtectedRoute>

      <MentorLayout />

    </MentorProtectedRoute>
  }
>

  <Route
    path="dashboard"
    element={
      <MentorDashboard />
    }
  />

  <Route
  path="subjects"
  element={
    <Subjects />
  }
/>

  <Route
  path="lectures"
  element={
    <Lectures />
  }
/>

  <Route
    path="live-classes"
    element={
      <div className="text-white">
        Live Classes Page
      </div>
    }
  />

  <Route
    path="analytics"
    element={
      <div className="text-white">
        Analytics Page
      </div>
    }
  />

  <Route
    path="availability"
    element={
      <Availability />
    }
  />

  <Route
  path="sessions"
  element={<Sessions />}
/>


  <Route
    path="profile"
    element={<MentorDashboardProfile />}
  />

  


  

</Route>

      {/* 🎓 Student Onboarding */}
      <Route
        path="/onboarding"
        element={
          <RoleProtectedRoute
            allowedRole="STUDENT"
          >

            {!user?.onboardingCompleted ? (

              <Onboarding />

            ) : (

              <Navigate
                to="/student/dashboard"
                replace
              />

            )}

          </RoleProtectedRoute>
        }
      />

      {/* 🎯 Student Dashboard */}
      <Route
        path="/student"
        element={
          <RoleProtectedRoute
            allowedRole="STUDENT"
          >

            {user?.onboardingCompleted ? (

              <DashboardLayout />

            ) : (

              <Navigate
                to="/onboarding"
                replace
              />

            )}

          </RoleProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<Dashboard />}
        />
        <Route
        path="profile"
        element={<Profile />}
        />

        <Route
  path="subscriptions"
  element={<Subscriptions />}
/>

        <Route
          path="analytics"
          element={<Analytics />}
        />
        <Route
          path="problems"
          element={<PracticeProblems />}
        />

        

        <Route
          path="tests"
          element={<Tests />}
        />

        <Route
          path="leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="achievements"
          element={<Achievements />}
        />

        <Route
          path="community"
          element={<Community />}
        />

        <Route
    path="book-session"
    element={<BookSession />}
  />


  <Route
    path="book-session/:mentorId"
    element={<MentorProfile />}
  />
  <Route
  path="my-sessions"
  element={<MySessions />}
/>

      </Route>

      {/* 🛑 Catch All */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />



     

    </Routes>

  );

}

export default AppRoutes;