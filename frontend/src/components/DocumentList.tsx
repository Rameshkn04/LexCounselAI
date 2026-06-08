import { useEffect, useState } from "react";
import API from "../services/api";

function DocumentList() {

  const [documents, setDocuments] =
    useState([]);

  useEffect(() => {

    API.get(
      "/documents/list"
    ).then((response) => {

      setDocuments(
        response.data
      );

    });

  }, []);

  return (

    <div>

      <h3>Documents</h3>

      {documents.map(
        (doc: any) => (

          <p key={doc.id}>
            📄 {doc.filename}
          </p>

        )
      )}

    </div>

  );
}

export default DocumentList;