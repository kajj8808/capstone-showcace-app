import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import useMutation from "@libs/client/useMutaion";
import io, { Socket } from "socket.io-client";
import path from "path";
import { useSetRecoilState } from "recoil";
import { uploadState } from "@libs/client/atom";

//const chuckSize = 1e8; // 100MB
const chuckSize = 1e7;

interface IUploadInfo {
  uploadId: number;
  extension: string | undefined;
}

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadId, setUploadId] = useState<number>();
  const [uploadIndex, setUploadIndex] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>();

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const socketRef = useRef<Socket | null>(null);

  const setUploadState = useSetRecoilState(uploadState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadId(new Date().getTime());
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (evnet: React.FormEvent) => {
    evnet.preventDefault();

    setUploadState({ id: "", isUploading: true });
    //&& file.type.includes("video")
    if (file && uploadId) {
      const uploadInfo: IUploadInfo = {
        uploadId: uploadId,
        extension: path.extname(file.name),
      };
      socketRef.current?.emit("uploadStart", uploadInfo);
      videoFileSliceingAndUpload();
    } else {
    }
  };
  useEffect(() => {
    socketRef.current = io("wss://shirabii.shop:4000");
    socketRef.current.on("connect", () => {
      setIsConnected(true);
    });
    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.disconnect();
      }
    };
  }, []);

  // next step
  useEffect(() => {
    if (file) {
      videoFileSliceingAndUpload();
      if (uploadIndex * chuckSize > file.size) {
        setUploadState({ id: uploadId + "", isUploading: false });
      }
    }
  }, [uploadIndex]);

  const plusUploadIndex = () => setUploadIndex((prev) => (prev += 1));

  const videoFileSliceingAndUpload = () => {
    if (file) {
      const blob = file.slice(
        uploadIndex * chuckSize, // from
        (uploadIndex + 1) * chuckSize // to
      );
      socketRef.current?.emit("upload", blob, plusUploadIndex);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>Server State {isConnected ? "🟢" : "🔴"}</span>
        <br />
        <input type="file" onChange={onChange} />
        <button>Send VideoFile!</button>
        <br />
        <progress value={chuckSize * uploadIndex} max={file?.size}>
          0%
        </progress>
        {chuckSize * uploadIndex}/{file?.size ? file?.size : "0"}
      </form>
    </>
  );
}
