import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  /// use Context to change the state for toggle
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button onClick={toggleSidebar} type="button" className="toggle-btn">
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
