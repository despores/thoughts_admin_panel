import React from "react";

function Scroll({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ overflowY: "scroll", height: "70vh" }}>
            {children}
        </div>
    );
}

export default Scroll;