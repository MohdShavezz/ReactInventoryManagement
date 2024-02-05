import React from "react";

const Home = () => {
  return (
    <div style={{ width: "130vh", height: "83vh" }}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <h2>Home</h2>
        {localStorage.getItem("token") && (
          <button
          style={{height:'2.5rem',background:"maroon",marginTop:'1rem'}}
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
