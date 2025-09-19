import React from "react";
import "./tab.css";

const Tab = ({ tabs, active, setActive }) => {
    return (
        <div className="tabs">
            <div className="tabs-container">
                <TabLink
                        designation={"Tout"}
                        onActive={setActive}
                        key={0}
                        isActive={active}
                    />
                {tabs.map((tab, index) => (
                    <TabLink
                        icon={tab.icon}
                        designation={tab.designation}
                        onActive={setActive}
                        key={index}
                        isActive={active}
                    />
                ))} 
                
            </div>
        </div>
    );
};

export default Tab;

function TabLink({ icon, designation, onActive = () => {}, isActive = "" }) {
    return (
        <div
            className={
                isActive === designation
                    ? "tab-link event-icon-detail active"
                    : "tab-link event-icon-detail "
            }
            onClick={() => onActive(designation)}
        >
            {icon && <i className={"fa-solid " + icon}></i>}
            <span>{designation}</span>
        </div>
    );
}
