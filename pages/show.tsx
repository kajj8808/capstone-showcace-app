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
  console.log(data);
  return (
    <div>
      <div className="fixed top-0 z-10 h-[300px] w-full">
        <div className="h-[300px] w-full">
          {data ? (
            <Image
              src={`https://facecheck.run-asia-northeast1.goorm.site/image?student_id=${data.studentId}`}
              alt=""
              width={630}
              height={630}
              className="h-full w-full object-cover object-center"
            />
          ) : null}
        </div>
        <div className="flex h-20 w-full flex-col items-center justify-center bg-white shadow-lg ">
          <span className="text-xl">5671155</span>
          <span className="text-sm text-gray-600">
            {data?.max_sim.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="s relative mt-[380px] py-3">
        <div className="absolute -top-3 flex w-full justify-center"></div>
        <div className="mt-5 flex flex-col gap-5 px-5 ">
          {data?.sim.map((item, index) => (
            <div key={index}>
              <StudentCard
                stuNum={item.studentId + ""}
                accuracy={item.sim}
                isAcruccyMilestone={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
