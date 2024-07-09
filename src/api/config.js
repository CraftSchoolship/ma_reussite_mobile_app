const config = {
  baseUrl: "https://test.erp.craftschoolship.com/jsonrpc",
  database: "bitnami_odoo",
  username: "test@example.com",
  password: "Temp4Now#",
  model: {
    partner: "res.partner",
    student: "craft.student",
    calendar: "calendar.event",
    opCourse: "op.course",
    opSession: "op.session",
    craftSession: "craft.session",
    users: "res.users",
    parents: "craft.parent",
    teachers: "craft.teacher",
    groups: "op.batch",
    attendance: "op.attendance.line",
    saleOrder: "sale.order",
    accountMove: "account.move",
    accountMoveLine: "account.move.line",
    craftInvoice: "craft.invoice",
    craftInstallmentLines: "craft.installment.lines",
    productTemplate: "product.template",
  },
};

export default config;
