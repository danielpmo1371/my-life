import React from "react";

const pages = [{title: 'Home', url: '/'}, {title: 'Projects', url: '/projects'}, {title: 'Budget', url: '/budget'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {

  return (
    <div className="navbar flex-grow w-full">
        {pages.map((page) => 
            <a className="nav-item" key={page.url} href={page.url}>{page.title}</a>
            )}        
    </div>
  );
}
export default ResponsiveAppBar;
