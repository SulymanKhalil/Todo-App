import { useModel, useNavigate } from "@umijs/max";
import { useState, useEffect } from "react";
import { Button, Input, Card, message } from "antd";

export default function LoginPage() {
  const { initialState, setInitialState } = useModel("@@initialState");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (initialState?.user) {
      navigate("/", { replace: true });
    }
  }, [initialState, navigate]);

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      message.error("Please enter valid username and password");
    } else if (username.length < 5 || password.length < 5) {
      message.error("Username and password must be at least 5 characters long");
    } else {
      let role = "user";
      if (username === "admin" && password === "admin") {
        role = "admin";
      }

      const user = { username, role };
      localStorage.setItem("user", JSON.stringify(user));

      setInitialState((prev) => ({
        ...prev,
        user,
      }));

      message.success("Login Successful!");
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      dir="ltr"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <style>{`
  .custom-input::placeholder {
    color: #94a3b8 !important;
    opacity: 1;
  }
  
  .custom-input input::placeholder {
    color: #94a3b8 !important;
    opacity: 1;
  }

  .ant-input-password-icon {
    color: #94a3b8 !important;
  }
  .ant-input-password-icon:hover {
    color: #f1f5f9 !important;
  }
`}</style>
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1e293b",
          border: "1px solid #475569",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#0ea5e9",
              marginBottom: "8px",
            }}
          >
            TaskFlow
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
            Sign in to your account
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="large"
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #475569",
              color: "#f1f5f9",
              borderRadius: "8px",
            }}
            variant="filled"
            className="custom-input"
          />

          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #475569",
              color: "#f1f5f9",
              borderRadius: "8px",
            }}
            variant="filled"
            className="custom-input"
          />

          <Button
            onClick={handleLogin}
            type="primary"
            size="large"
            style={{
              backgroundColor: "#0ea5e9",
              borderColor: "#0ea5e9",
              height: "48px",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Sign In
          </Button>
        </div>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "0.75rem" }}>
            Admin credentials: admin / admin
          </p>
        </div>
      </Card>
    </div>
  );
}
