const PlanSkeleton = () => {
  return (
    <div
      className="
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        animate-pulse
      "
    >
      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="border-b border-gray-100 p-6">

        <div className="h-6 w-36 rounded-md bg-gray-200" />

        <div className="mt-3 space-y-2">

          <div className="h-3 w-full rounded bg-gray-200" />

          <div className="h-3 w-4/5 rounded bg-gray-200" />

        </div>


        {/* Price */}

        <div className="mt-6 flex items-end gap-2">

          <div className="h-9 w-28 rounded-md bg-gray-200" />

          <div className="mb-1 h-4 w-16 rounded bg-gray-200" />

        </div>

      </div>


      {/* ==================================================
          FEATURES
          ================================================== */}

      <div className="flex-1 p-6">

        <div className="space-y-5">

          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div className="h-4 w-28 rounded bg-gray-200" />

                <div className="h-4 w-20 rounded bg-gray-200" />

              </div>
            )
          )}

        </div>


        {/* ==================================================
            TEST ACCESS
            ================================================== */}

        <div className="mt-7">

          <div className="mb-4 h-4 w-24 rounded bg-gray-200" />

          <div className="space-y-3">

            {Array.from({ length: 5 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-gray-100
                    p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        h-9
                        w-9
                        rounded-lg
                        bg-gray-200
                      "
                    />

                    <div className="space-y-2">

                      <div
                        className="
                          h-3
                          w-24
                          rounded
                          bg-gray-200
                        "
                      />

                      <div
                        className="
                          h-2.5
                          w-20
                          rounded
                          bg-gray-200
                        "
                      />

                    </div>

                  </div>


                  <div
                    className="
                      h-4
                      w-20
                      rounded
                      bg-gray-200
                    "
                  />

                </div>
              )
            )}

          </div>

        </div>

      </div>


      {/* ==================================================
          BUTTON
          ================================================== */}

      <div className="border-t border-gray-100 p-6">

        <div
          className="
            h-11
            w-full
            rounded-lg
            bg-gray-200
          "
        />

      </div>

    </div>
  );
};


export default PlanSkeleton;