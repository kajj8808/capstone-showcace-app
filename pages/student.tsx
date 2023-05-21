import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  picrure: FileList;
}

// picture
export default function Student() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const [picrurePreview, setPicrurePreview] = useState("");
  const [uploadError, setUploadError] = useState<String | null>(null);
  const [stuNum, setStunum] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const onValid = ({ picrure }: IForm) => {
    if (picrure) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(picrure[0]);
      fileReader.onload = () => {
        const base64 = fileReader.result
          ?.toString()
          .split("data:image/jpeg;base64,")[1];
        fetch("https://facecheck.run-asia-northeast1.goorm.site/register", {
          method: "POST",
          mode: "cors",
          headers: { "Content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            encodedImage: base64,
            studentID: stuNum + "",
          }),
        }).then(async (res) => {
          if (res.status == 200) {
            const { msg } = await res.json();
            if (msg === "얼굴이 정상적으로 등록되었습니다") {
              setIsUploaded(true);
            }
          }
        });
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

  useEffect(() => {
    const time = new Date().getTime() + "";
    setStunum(`567${time.slice(9, 13)}`);
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#fbfbfd] px-20">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="rounded-2xl bg-white px-8 py-7 shadow-2xl">
          <div className="flex gap-8">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[rgba(0,0,0,0.2)] shadow-md ring-1 ring-stone-50">
              <input
                type="file"
                {...register("picrure")}
                disabled={isUploaded}
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
            <div className="flex flex-col justify-between border-l pl-3">
              <div className="flex w-[35vw] flex-col sm:w-[50vw] md:w-[398px]">
                <span className="mb-1.5 text-xl font-medium">
                  {stuNum ? stuNum : ""}
                </span>
                <span className="text-xs text-gray-500">Description</span>
              </div>

              <div className="flex justify-between">
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
        </div>
        <div className="mt-24 flex w-full justify-center">
          <button
            disabled={isUploaded}
            className={` w-32 rounded-xl ${
              isUploaded
                ? "bg-slate-500 text-gray-400"
                : "bg-blue-500 hover:bg-teal-500 focus:bg-red-500 active:bg-yellow-500"
            } p-3 text-center text-white `}
          >
            <span>Checkout</span>
          </button>
        </div>
      </form>
    </div>
  );
}
