import File from "./File";
import "../styles/File.css";

export default function FileListView({
  files,
  onRename,
  onDescriptionEdit,
  onDownload,
  onDelete,
  onShare,
  unShare,
}) {
  return (
      <div className="file-list-view">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Наименование</th>
              <th scope="col">Размер</th>
              <th scope="col">Загружен</th>
              <th scope="col">Последний раз скачан</th>
              <th scope="col">Комментарий</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <File
                key={file.id}
                index={index}
                file={file}
                onRename={onRename}
                onDescriptionEdit={onDescriptionEdit}
                onDownload={onDownload}
                onDelete={onDelete}
                onShare={onShare}
                unShare={unShare}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
}
