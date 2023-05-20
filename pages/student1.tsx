import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  picrure: FileList;
}

// picture
export default function Student1() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const [picrurePreview, setPicrurePreview] = useState("");
  const [uploadError, setUploadError] = useState<String | null>(null);

  const onValid = ({ picrure }: IForm) => {
    if (picrure) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(picrure[0]);
      fileReader.onload = () => {
        console.log(fileReader.result);
      };
    }
  };

  const picrure = watch("picrure");

  useEffect(() => {
    if (picrure && picrure.length > 0) {
      if (!picrure[0].type.includes("image")) {
        setUploadError("this file is not image");
        return;
      }
      const file = picrure[0];
      // Memory => url
      setPicrurePreview(URL.createObjectURL(file));
    }
  }, [picrure]);
  //#1d1d1f
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fbfbfd] px-20">
      <div className="rounded-2xl bg-white shadow-2xl">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="flex w-[80vw] flex-col items-center py-5 md:w-[380px]">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[rgba(0,0,0,0.2)] shadow-md ring-1 ring-stone-50">
              <input
                type="file"
                {...register("picrure")}
                className="absolute h-full w-full opacity-0"
              />
              {picrurePreview ? (
                <Image
                  src={picrurePreview}
                  width={430}
                  height={430}
                  alt="preview picrure"
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex flex-col items-center">
                <span className="mb-1.5 text-xl font-medium">5671144</span>
                <span className="text-xs text-gray-500">Description</span>
              </div>

              <div className="mt-10 flex justify-between">
                <div className="flex gap-2">
                  <span className="rounded-md bg-indigo-500 px-2 py-1 text-xs text-white">
                    #컴퓨터 공학과
                  </span>
                  <span className="rounded-md bg-teal-500 px-2 py-1 text-xs text-white">
                    #
                  </span>
                </div>
                <span className="text-xs text-gray-500"></span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <div className="mt-24 w-32 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 focus:bg-red-500 active:bg-yellow-500">
          <span>Checkout</span>
        </div>
      </div>
    </div>
  );
}
