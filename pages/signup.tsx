import StudentCard from "@components/StudentCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  picrure: FileList;
}

// picture
export default function Student() {
  //#1d1d1f

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fbfbfd] px-20">
      <StudentCard isUpload={true} />
    </div>
  );
}
