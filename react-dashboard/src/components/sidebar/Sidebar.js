import "./Sidebar.css";
import Dropdown from 'react-bootstrap/Dropdown'
import logo from "../../assets/logo1.jpg"
const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <div id="sidebar">
            <div className={sidebarOpen ? "sidebar-responsive" : ""}>
                <div className="sidebar_title">
                    <div className="sidebar_image">
                        <img src={logo} alt="logo" width="100%" height="100px"></img>
                    </div>
                    <i className="fa fa-times" id="sidebarIcon" onClick={() => closeSidebar()}>

                    </i>
                </div>
                {/* <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <div className="sidebar__menu">
                    <div className="sidebar__link active_menu_link">
                        <i className="fa fa-home"></i>
                        <a href="/">Dashboard</a>
                    </div>
                    <h2>Product Research</h2>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/home">Research</a>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/top10state">Top 10 State</a>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/top10city">Top 10 City</a>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/yearlySales">Year Wise</a>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/monthlySales">Month wise</a>
                    </div>
                    <div className="sidebar__link">
                        <i className="fa fa-line-chart"></i>
                        <a href="/dailySales">Day wise</a>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Sidebar;