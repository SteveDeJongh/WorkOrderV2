import { Action, Invoice } from "../../types/invoiceTypes";
import { sumAProp } from "../../utils";

function invoiceReducer(invoice: Invoice, action: Action): Invoice {
  switch (action.type) {
    case "setInvoice": {
      return { ...action.data };
    }
    case "recaculateInvoice": {
      let payments = sumAProp(invoice.payments, "amount", { _destroy: true });
      let sub_total = sumAProp(invoice.invoice_lines, "line_total");
      let tax = sumAProp(invoice.invoice_lines, "line_tax");
      let total = sub_total + tax;
      let balance = total - payments;
      return {
        ...invoice,
        sub_total: sub_total,
        total: total,
        tax: tax,
        balance: balance,
      };
    }
    case "updateCustomer": {
      return { ...invoice, customer_id: action.customerId };
    }
    case "removeCustomer": {
      return { ...invoice, customer_id: undefined };
    }
    case "createInvoiceLine": {
      invoice.invoice_lines.push(action.invoice_line);
      return invoice;
    }
    case "updateInvoiceLine": {
      const NewInvoiceLines = invoice.invoice_lines.map((line) => {
        if (
          line.id === action.invoice_line.id &&
          line.created_at === action.invoice_line.created_at
        ) {
          return action.invoice_line;
        } else {
          return line;
        }
      });
      return { ...invoice, invoice_lines: NewInvoiceLines };
    }
    case "togglePaymentDelete": {
      const newPayments = invoice.payments.map((payment) => {
        if (
          payment &&
          payment.id === action.paymentId &&
          payment.created_at === action.created_at
        ) {
          payment._destroy = !payment._destroy;
        }
        return payment;
      });
      return { ...invoice, payments: newPayments };
    }
    case "updatePayment": {
      const newPayments = invoice.payments.map((payment) => {
        if (
          payment.id === action.payment.id &&
          payment?.created_at === action.payment.created_at
        ) {
          return action.payment;
        } else {
          return payment;
        }
      });
      return { ...invoice, payments: newPayments };
    }
    case "createPayment": {
      invoice.payments.push(action.payment);
      return invoice;
    }
  }
  return invoice;
}

export { invoiceReducer };