import React from 'react';

function Home({onLogout}){
    function closeSession() {
        onLogout();
    }
    return (
        <div>
            <p>home</p>
            <button onClick={closeSession}>Log out</button>
        </div>
    );
}

export default  Home;