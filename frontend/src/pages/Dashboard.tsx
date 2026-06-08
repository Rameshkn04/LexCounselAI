import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

function Dashboard() {

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <Sidebar />

        <div className="main-content">
          <ChatBox />
        </div>

      </div>
    </>
  );
}

export default Dashboard;