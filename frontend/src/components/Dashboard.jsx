import { useSelector } from "react-redux";
import sizify from "../utils/Sizify";

export default function Dashboard() {
  const storageData = useSelector((state) => state.storage.storageData);

  const fileCount = storageData ? Object.keys(storageData).length : 0;

  const totalSize = storageData
    ? Object.values(storageData).reduce(
        (total, file) => total + file.byte_size,
        0
      )
    : 0;

  return (
    <>
      {fileCount > 0 ? (
        <>
          <span> {fileCount} шт. / {sizify(totalSize)}</span>
        </>
      ) : null}
    </>
  );
}
