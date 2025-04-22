// Invoice

// {
//   view === "profile" && (
//     <Grid2
//       container
//       direction="column"
//       spacing={5}
//       py={{ xs: 3 }}
//       px={{ xs: 1, sm: 2 }}
//       size={{ xs: 12 }}
//     >
//       <Grid2 container direction="row" justifyContent={"space-between"}>
//         <Typography
//           component={"h4"}
//           variant="h4"
//           sx={{ display: { xs: "none", sm: "flex" } }}
//         >
//           Invoices
//         </Typography>
//         {/* For small screen invoice selection */}
//         <Button
//           sx={{ display: { xs: "flex", sm: "none" } }}
//           onClick={() => setOpen(true)}
//           endIcon={<MenuIcon />}
//         >
//           Select Invoice
//         </Button>
//         <ViewToggle view={view} setView={viewSetter} />
//       </Grid2>
//       <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
//         {/* Selection */}
//         <Grid2
//           size={{ sm: 3, xl: 2 }}
//           sx={{ display: { xs: "none", sm: "flex" }, height: "78vh" }}
//         >
//           <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
//             <LeftListWithAction
//               title={"Invoices"}
//               linkToPage={""}
//               getter={useInvoicesData}
//             />
//           </Card>
//         </Grid2>
//         {/* Small Screen selection */}
//         <Drawer sx={{ display: { sm: "none" } }} open={open}>
//           <ClickAwayListener onClickAway={() => setOpen(false)}>
//             <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
//               <LeftListWithAction
//                 title={"Invoices"}
//                 linkToPage={""}
//                 getter={useInvoicesData}
//               />
//             </Card>
//           </ClickAwayListener>
//         </Drawer>
//         {/* Data Display */}
//         <Grid2 size={{ xs: 12, sm: 9, xl: 10 }} sx={{ display: "flex" }}>
//           <Card variant="outlined" sx={{ padding: 0, width: "100%" }}>
//             {renderNoSelection ? (
//               <NoSelection item={"invoice"} />
//             ) : (
//               // <Outlet />
//               <Card variant="outlined" sx={{ padding: 0, width: "100%" }}>
//                 <Box
//                   sx={{
//                     overflowX: "hidden",
//                     border: "2px dashed red",
//                     width: "100%",
//                   }}
//                 >
//                   <Outlet />
//                 </Box>
//               </Card>
//             )}
//           </Card>
//         </Grid2>
//       </Grid2>
//     </Grid2>
//   );
// }
// {
//   view === "table" && (
//     <Grid2
//       container
//       direction="column"
//       spacing={2}
//       py={{ xs: 3 }}
//       px={{ xs: 1, sm: 2 }}
//       sx={{
//         overflow: "auto",
//         // height: "88vh",
//         // width: "100%",
//       }}
//       size={{ xs: 12 }}
//     >
//       <Grid2 container direction="row" justifyContent={"space-between"}>
//         <Typography component={"h4"} variant="h4">
//           Invoices
//         </Typography>
//         <ViewToggle view={view} setView={viewSetter} />
//       </Grid2>
//       <Grid2 container direction="row" sx={{ width: "100%" }}>
//         <FullWidthTable
//           title={"Invoices"}
//           fetcher={useInvoicesData}
//           columns={INVOICECOLUMNSALT}
//           colPreferences={user!.preferences.invoice_columns}
//           colOptions={INVOICECOLUMNOPTIONS}
//         />
//       </Grid2>
//     </Grid2>
//   );
// }

// Product

// {view === "profile" && (
//   <Grid2 container direction="column" spacing={5} mx={5} my={3}>
//     <Grid2 container direction="row" justifyContent={"space-between"}>
//       <Typography component={"h4"} variant="h4">
//         Products
//       </Typography>
//       <ViewToggle view={view} setView={viewSetter} />
//     </Grid2>
//     <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
//       <Grid2 size={{ xs: 3 }} sx={{ display: "flex", height: "78vh" }}>
//         <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
//           <LeftListWithAction
//             title={"Products"}
//             linkToPage={"view"}
//             getter={useProductsData}
//           />
//         </Card>
//       </Grid2>
//       <Grid2 size={{ xs: 9 }} sx={{ display: "flex" }}>
//         <Card
//           variant="outlined"
//           sx={{ padding: 1, height: "78vh", width: "100%" }}
//         >
//           {renderNoSelection ? (
//             <NoSelection item={"product"} />
//           ) : (
//             <Outlet />
//           )}
//         </Card>
//       </Grid2>
//     </Grid2>
//   </Grid2>
// )}
// {view === "table" && (
//   <Grid2 container direction="column" spacing={5} m={5}>
//     <Grid2 container direction="row" justifyContent={"space-between"}>
//       <Typography component={"h4"} variant="h4">
//         Products
//       </Typography>
//       <ViewToggle view={view} setView={viewSetter} />
//     </Grid2>
//     <Grid2 container direction="row">
//       <FullWidthTable
//         title={"Products"}
//         fetcher={useProductsData}
//         columns={PRODUCTCOLUMNS}
//         colPreferences={user!.preferences.product_columns}
//         colOptions={PRODUCTCOLUMNOPTIONS}
//       />
//     </Grid2>
//   </Grid2>
// )}

// Customer

// {view === "profile" && (
//   <Grid2 container direction="column" spacing={5} mx={5} my={3}>
//     <Grid2 container direction="row" justifyContent={"space-between"}>
//       <Typography component={"h4"} variant="h4">
//         Customers
//       </Typography>
//       <ViewToggle view={view} setView={viewSetter} />
//     </Grid2>
//     <Grid2 container direction="row" spacing={3} alignItems={"stretch"}>
//       <Grid2 size={{ xs: 3 }} sx={{ display: "flex", height: "78vh" }}>
//         <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
//           <LeftListWithAction
//             title={"Customers"}
//             linkToPage={"profile"}
//             getter={useCustomersData}
//           />
//         </Card>
//       </Grid2>
//       <Grid2 size={{ xs: 9 }} sx={{ display: "flex" }}>
//         <Card variant="outlined" sx={{ padding: 1, width: "100%" }}>
//           {renderNoSelection ? (
//             <NoSelection item={"customer"} />
//           ) : (
//             <Outlet />
//           )}
//         </Card>
//       </Grid2>
//     </Grid2>
//   </Grid2>
// )}
// {view === "table" && (
//   <Grid2 container direction="column" spacing={5} m={5}>
//     <Grid2 container direction="row" justifyContent={"space-between"}>
//       <Typography component={"h4"} variant="h4">
//         Customers
//       </Typography>
//       <ViewToggle view={view} setView={viewSetter} />
//     </Grid2>
//     <Grid2 container direction="row">
//       <FullWidthTable
//         title={"Customers"}
//         fetcher={useCustomersData}
//         columns={CUSTOMERCOLUMNS}
//         colPreferences={user!.preferences.customer_columns}
//         colOptions={CUSTOMERCOLUMNOPTIONS}
//       />
//     </Grid2>
//   </Grid2>
// )}
