import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface GroupBySwitchProps {
  handleSwitchChange: (newValue: boolean) => void;
  GroupByChecked: boolean;
}

const GroupBySwitch: React.FC<GroupBySwitchProps> = ({ handleSwitchChange, GroupByChecked }) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleSwitchChange(checked);
  };

  return (
    <div>
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Switch checked={GroupByChecked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />

          <Typography variant="body2">Group by Token</Typography>
        </Stack>
      </FormGroup>
    </div>
  );
};

export default GroupBySwitch;
