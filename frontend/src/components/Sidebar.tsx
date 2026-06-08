import UploadDocument from "./UploadDocument";
import DocumentList from "./DocumentList";

function Sidebar() {

  return (
    <div className="sidebar">

      <h2 className="sidebar-title">
        Documents
      </h2>

      <UploadDocument />

      <DocumentList />

    </div>
  );
}

export default Sidebar;