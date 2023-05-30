import StudentCard from "@components/StudentCard";
import Image from "next/image";
import useSWR from "swr";

type Sim = { sim: number; studentId: string };

interface IFackcheckData {
  sim: Sim[];
  studentId: string;
  max_sim: number;
}

export default function Show() {
  const { data, error } = useSWR<IFackcheckData>(
    "https://facecheck.run-asia-northeast1.goorm.site/detection"
  );

  return (
    <div className="md:mt-10 md:flex md:h-screen md:w-full md:justify-center">
      <div className="fixed top-0 z-10 w-full overflow-hidden md:relative md:max-w-2xl md:rounded-3xl">
        <div className="h-[260px] w-full bg-white md:h-[70vh]">
          {data?.studentId ? (
            <Image
              src={`https://facecheck.run-asia-northeast1.goorm.site/image?student_id=${data.studentId}`}
              alt=""
              width={630}
              height={630}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <Image
              src={`http://localhost:3000/FuzoaSaWYAIuR2P.jpg`}
              alt=""
              width={630}
              height={630}
              className="h-full w-full object-cover object-top "
            />
          )}
        </div>
        {/* <div className="absolute top-0 z-20 h-[300px] w-full bg-gradient-to-b from-transparent via-transparent to-gray-100 md:h-[70vh]"></div> */}
        <div className="flex h-20 w-full flex-col items-center justify-center bg-white shadow-lg ">
          <span className="text-xl">
            {data?.studentId
              ? `${data.studentId}`
              : "Not Found Matched Student..."}
          </span>
          <span className="text-sm text-gray-600">
            {data?.max_sim ? data?.max_sim.toFixed(2) : ""}%
          </span>
        </div>
      </div>
      <div className="mt-[380px] py-3 md:mt-0">
        <div className="mt-5 flex flex-col gap-5 px-7 sm:px-9 md:mt-0 ">
          {data?.sim
            ? data?.sim.map((item, index) => (
                <div key={index}>
                  <StudentCard
                    stuNum={item.studentId + ""}
                    accuracy={item.sim}
                    isAcruccyMilestone={true}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
