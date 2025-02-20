import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { LoadingBox } from "../multiuse/LoadingBox";
import { CustomerForm } from "./CustomerForm";
import {
  editCustomer,
  fetchCustomerData,
  fetchCustomerInvoices,
} from "../../services/customerServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Customer,
  CustomerWithNotices,
  EditableCustomerData,
} from "../../types/customers";
import { Invoice } from "../../types/invoiceTypes";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { INVOICECOLUMNS } from "../columns";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: Function;
  resourceId: number;
};

function CustomerModal({ open, onClose, resourceId }: Props) {
  const navigate = useNavigate();

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let target = e.target as HTMLElement;
    if (target.className === "main-modal-background") {
      onClose();
    }
  }

  // Main Pane states
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState<Customer>();
  const [tab, setTab] = useState("Profile");
  const [customerInvoices, setCustomerInvoices] = useState<Invoice[]>();

  // Profile Tab
  useEffect(() => {
    async function loadCustomerData() {
      try {
        setMainLoading(true);
        const response = await fetchCustomerData(resourceId as number);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }
    if (resourceId) {
      loadCustomerData();
    }
  }, [resourceId]);

  let customerData: CustomerWithNotices | undefined = mainData
    ? Object.keys(mainData).length < 1
      ? undefined
      : mainData
    : undefined;

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

  // Edit Tab
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (rawData: EditableCustomerData) => {
      return await editCustomer(
        resourceId,
        objectToFormData({ customer: rawData })
      );
    },
    onSuccess: (data) => {
      setMainData(data);
      const oldData = queryClient.getQueryData([
        "customersSearch",
      ]) as Customer[];
      let newData = oldData.map((customer: Customer) =>
        customer.id === resourceId ? data : customer
      );
      queryClient.setQueryData(["customersSearch"], newData);
      setTab("Profile");
    },
  });

  const pages = ["Profile", "Edit", "Invoices"];

  useEffect(() => {
    async function loadCustomerInvoices() {
      if (mainData) {
        const response = await fetchCustomerInvoices(mainData.id);
        setCustomerInvoices(response);
      }
      return;
    }

    if (tab === "Invoices") {
      loadCustomerInvoices();
    }
  }, [tab]);

  function onClick(invoice: Invoice) {
    navigate(`/invoices/${invoice.id}/`);
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          {mainLoading && <LoadingBox text="Loading Customer..." />}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && customerData && (
            <>
              <div className="modal-pane-header">
                <div className="modal-pane-header-title">
                  <h2>{`${customerData.first_name} ${customerData.last_name}`}</h2>
                  <div className="modal-pane-id">
                    Customer {customerData.id}
                  </div>
                </div>
                <div className="modal-pane-nav">
                  <ul className="modal-pane-nav mid-nav">
                    {pages.map((page: string) => {
                      return (
                        <li
                          key={page}
                          className={"mid-nav-pill"}
                          onClick={() => setTab(page)}
                        >
                          <span className={page === tab ? "active" : ""}>
                            {page}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="modal-content">
                {tab === "Profile" && customerData && (
                  <>
                    <div className="panel">
                      <h3>Details</h3>
                      <div className="panel-contents">
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">📞</div>
                          <div className="panel-section-data">
                            <div className="data-item">
                              {customerData.phone}
                            </div>
                            <div className="data-item">
                              {customerData.phone}
                            </div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">📧</div>
                          <div className="panel-section-data">
                            <div className="data-item">
                              {customerData.email}
                            </div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">🏠</div>
                          <div className="panel-section-data">
                            <div className="data-item">
                              {customerData.address}
                            </div>
                            <div className="data-item">
                              {customerData.city} {customerData.province}{" "}
                              {customerData.postal}
                            </div>
                            <div className="data-item">
                              {customerData.country}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel customer-notices">
                      <h3>
                        Notices <span>({`${noticeCount}`})</span>
                      </h3>
                      <ul>
                        {noticeCount === 0 && <li>No Notices</li>}
                        {noticeCount !== 0 &&
                          customerData.notices &&
                          customerData.notices.map((notice) => {
                            return <li key={notice.id}>{notice.notice}</li>;
                          })}
                      </ul>
                    </div>
                    <div className="panel customer-history">
                      <h3>History</h3>
                      <ul>
                        <li>Todo...</li>
                      </ul>
                    </div>
                  </>
                )}
                {tab === "Edit" && (
                  <>
                    <CustomerForm
                      modalForm={true}
                      customer={customerData}
                      headerText={`Edit Customer`}
                      buttonText={"Save"}
                      onSubmit={mutate}
                    />
                  </>
                )}
                {tab === "Invoices" && customerInvoices && (
                  <ScrollableTableTall
                    columns={INVOICECOLUMNS}
                    data={customerInvoices}
                    onClick={(invoice: Invoice) => onClick(invoice)}
                    inModal={true}
                  />
                )}
                {tab === "Invoices" && !customerInvoices && (
                  <LoadingBox text="Loading Invoices..." />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
}

export { CustomerModal };
