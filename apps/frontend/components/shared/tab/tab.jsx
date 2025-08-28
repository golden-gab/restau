import React from "react";
import "./tab.css";

const Tab = ({ tabs , active , setActive}) => {
    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <TabLink
                    icon={tab.icon}
                    info={tab.info}
                    onActive={setActive}
                    key={index}
                    isActive={active}
                />
            ))}
        </div>
    );
};

export default Tab;

function TabLink({ icon, info, onActive = () => {}, isActive = "" }) {
    return (
        <div
            className={
                isActive === info
                    ? "tab-link event-icon-detail active"
                    : "tab-link event-icon-detail "
            }
            onClick={() => onActive(info)}
        >
            {icon && <i className={"fa-solid " + icon}></i>}
            <span>{info}</span>
        </div>
    );
}
