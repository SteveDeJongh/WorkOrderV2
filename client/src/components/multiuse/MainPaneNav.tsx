import { Stack, Tab, Tabs, Typography } from "../../utils/muiImports";
import { TabProps } from "../Users/CustomTabPanel";

interface MainPaneNavProps {
  title: string;
  id: string | number;
  identifier: string;
  pages: Array<string>;
  tab: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const MainPaneNav: React.FC<MainPaneNavProps> = ({
  title,
  id,
  identifier,
  pages,
  tab,
  handleChange,
}) => {
  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
        <Typography>
          {identifier} {id}
        </Typography>
      </Stack>
      <Tabs value={tab} onChange={handleChange}>
        {pages.map((page, idx) => {
          return <Tab key={page} label={page} {...TabProps(idx)} />;
        })}
      </Tabs>
    </>
  );
};

export { MainPaneNav };
