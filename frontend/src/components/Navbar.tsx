function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };
  const userEmail =
  localStorage.getItem("userEmail") ||
  sessionStorage.getItem("userEmail") ||
  "User";

  const userInitial =
    userEmail.charAt(0).toUpperCase();

  return (

    <div className="topbar">

      <div className="topbar-left">

        <h2>
          ⚖️ LexCounsel AI
        </h2>

      </div>

      <div className="topbar-right">

        <div className="user-avatar">
          {userInitial}
        </div>

        <span className="user-name">
          {userEmail}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;