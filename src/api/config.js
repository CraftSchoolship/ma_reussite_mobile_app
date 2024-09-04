const config = {
  baseUrl: "https://test.erp.craftschoolship.com/jsonrpc",
  database: "bitnami_odoo",
  model: {
    accountMove: "account.move",
    accountMoveLine: "account.move.line",
    accountTax: "account.tax",
    calendar: "calendar.event",
    calendarAttendee: "calendar.attendee",
    craftInvoice: "craft.invoice",
    craftInstallmentLines: "craft.installment.lines",
    craftParent: "craft.parent",
    craftParentChildLine: "craft.parent.child.line",
    craftSession: "craft.session",
    craftStudent: "craft.student",
    craftTeachers: "craft.teacher",
    groups: "craft.class",
    partner: "res.partner",
    productTemplate: "product.template",
    resCurrency: "res.currency",
    resGroups: "res.groups",
    saleOrder: "sale.order",
    users: "res.users",
  },
};

export default config;
