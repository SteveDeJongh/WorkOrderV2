import { CustomerWithNotices, Customer } from "../../types/customers";
import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "../../utils/muiImports";

type Props = {
  mainData: Customer;
};

function CustomerProfile({ mainData }: Props) {
  const customerData: CustomerWithNotices = { ...mainData };

  // Example Notices data, to be part of the customer data api fetch in the future.
  if (customerData && customerData.first_name == "Steve") {
    customerData.notices = [
      { id: 1, notice: "This is notice 1." },
      { id: 2, notice: "This is notice 2." },
    ];
  } else if (customerData) {
    customerData.notices = [];
  }

  let noticeCount = customerData ? customerData.notices?.length : 0;

  return (
    <>
      {!customerData && (
        <Typography component="h2" variant="h2">
          No Customer Selected
        </Typography>
      )}
      {customerData && (
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ padding: 1 }}>
            <Typography variant="h6" component="h6" pb={1}>
              Details
            </Typography>
            <Box>
              <Stack spacing={2}>
                <Stack direction={"row"}>
                  <Box pr={2}>📞</Box>
                  <Box>
                    <Typography variant="body1">
                      {customerData.phone}
                    </Typography>
                    <Typography variant="body1">
                      {customerData.phone}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row">
                  <Box pr={2}>📧</Box>
                  <Box>
                    <Typography variant="body1">
                      {customerData.email}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction={"row"}>
                  <Box pr={2}>🏠</Box>
                  <Box>
                    <Typography variant="body1">
                      {customerData.address}
                    </Typography>
                    <Typography variant="body1">
                      {customerData.city} {customerData.province}{" "}
                      {customerData.postal}
                    </Typography>
                    <Typography variant="body1">
                      {customerData.country}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Paper>
          <Paper variant="outlined" sx={{ padding: 1 }}>
            <Typography variant="h6" component="h6">
              Notices
            </Typography>

            <List>
              {noticeCount === 0 && <ListItem>No Notices</ListItem>}
              {customerData.notices?.map((notice) => {
                return <ListItem key={notice.id}>{notice.notice}</ListItem>;
              })}
            </List>
          </Paper>
          <Paper variant="outlined" sx={{ padding: 1 }}>
            <Typography variant="h6" component="h6">
              History
            </Typography>

            <List>
              <ListItem>To do...</ListItem>
            </List>
          </Paper>
        </Stack>
      )}
    </>
  );
}

export { CustomerProfile };
