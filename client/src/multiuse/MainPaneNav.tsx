import { NavLink } from "react-router-dom";

interface MainPaneNavProps {
  title: string;
  id: string;
  identifier: string;
  pages: Array<string>;
}

const MainPaneNav: React.FC<MainPaneNavProps> = ({
  title,
  id,
  identifier,
  pages,
}) => {
  return (
    <>
      <div className="main-pane-header">
        <div className="main-pane-header-title">
          <h2>{title}</h2>
          <div className="main-pane-id">
            {identifier} {id}
          </div>
        </div>
        <div className="main-pane-nav">
          <ul className="main-pane-nav mid-nav">
            {pages.map((page: string) => {
              return (
                <li key={page} className="mid-nav-pill">
                  <NavLink
                    to={`/${
                      identifier.toLowerCase() + "s"
                    }/${id}/${page.toLowerCase()}`}
                  >
                    {page}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainPaneNav;
