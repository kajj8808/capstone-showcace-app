import { atom } from "recoil";

export interface IUploadState {
  id: string;
  isUploading: boolean;
}
export const uploadState = atom<IUploadState>({
  key: "uploadState",
  default: { id: "", isUploading: false },
});
