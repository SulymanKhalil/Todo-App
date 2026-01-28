import { useModel, useIntl, getLocale } from "@umijs/max";
import { Alert, Card, Statistic, Row, Col, Table, Tag } from "antd";

export default function AdminPage() {
  const intl = useIntl();
  const currentLang = getLocale();

  const t = (id) => intl.formatMessage({ id });

  const isRtl = currentLang === "ur" || currentLang === "ar";

  const { initialState } = useModel("@@initialState");
  const user = initialState?.user;

  if (!user) {
    return <Alert message="Please login first" type="error" />;
  }

  if (user.role !== "admin") {
    return <Alert message="Access denied. Admin only." type="error" />;
  }

  const fakeUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-10",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-02-01",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-02-05",
    },
  ];

  const stats = {
    totalUsers: fakeUsers.length,
    activeUsers: fakeUsers.filter((u) => u.status === "active").length,
    adminUsers: fakeUsers.filter((u) => u.role === "admin").length,
    inactiveUsers: fakeUsers.filter((u) => u.status === "inactive").length,
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "orange"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#0ea5e9",
            marginBottom: "32px",
          }}
        >
          {t("adminDashboard")}
        </h1>

        <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
              }}
            >
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                valueStyle={{ color: "#0ea5e9" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
              }}
            >
              <Statistic
                title="Active Users"
                value={stats.activeUsers}
                valueStyle={{ color: "#10b981" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
              }}
            >
              <Statistic
                title="Admin Users"
                value={stats.adminUsers}
                valueStyle={{ color: "#ef4444" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
              }}
            >
              <Statistic
                title="Inactive Users"
                value={stats.inactiveUsers}
                valueStyle={{ color: "#f59e0b" }}
              />
            </Card>
          </Col>
        </Row>

        <Card
          style={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
        >
          <h2
            style={{
              color: "#f1f5f9",
              fontSize: "1.5rem",
              marginBottom: "24px",
            }}
          >
            {t("registeredUsers")}
          </h2>
          <Table
            columns={columns}
            dataSource={fakeUsers}
            rowKey="id"
            style={{
              backgroundColor: "transparent",
            }}
            pagination={{
              style: { color: "#f1f5f9" },
            }}
          />
        </Card>
      </div>
    </div>
  );
}
