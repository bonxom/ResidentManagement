import SidebarForUser from "../../components/SidebarForUser";
import Topbar from "../../components/Topbar";

export default function mainuser() {
    return (
        <div style={{ display: "flex" }}>
            <SidebarForUser />
            <div style={{ width: "100%" }}>
                <Topbar />
            </div>
        </div>
    );
}
