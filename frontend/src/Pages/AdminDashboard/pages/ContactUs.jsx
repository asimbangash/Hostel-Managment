import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

const Contact = () => {
  const formRef = useRef();
  const [isloading, setisLoading] = useState(false);

  let users = [
    {
      name: "Atif Shinwari",
      email: "atifaslam@gmail.com",
      contact: "03169820534",
      message: "Welcome to UET",
  
    },
  
    
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setisLoading(true);
    emailjs
      .sendForm("service_pnhqfx5", "YOUR_TEMPLATE_ID", formRef.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        async () => {
          setisLoading(false);
          alert("email Send successfully");
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_UR}/api/v1/contactmess`,
            { message: formRef.current }
          );
        },
        (error) => {
          setisLoading(false);
          alert("failed sending mail");
        }
      );
  };

  function handleEmailSendClick(name, email, message) {
    emailjs
      .send(
        "service_pnhqfx5",
        "template_iojq6ld",
        {
          from_name: name,
          message: message,
        },
        {
          publicKey: "hHoCt5WlsnZOp8iID",
        }
      )
      .then(
        async () => {
          alert("Send successfully");
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_UR}/api/v1/contactmess`,
            { message: message }
          );
        },
        (error) => {
          alert("failed sending mail");
        }
      );
  }

  return (
    <div className="w-full mr-3  h-auto">
      <table className=" w-full rounded border-2 p-2 h-auto">
        <thead className="h-20  font-serif border bg-[#4aa4d9] text-white">
          <tr className="text-center">
            <td>ID</td>
            <td>User Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Message</td>
            <td>Send Email</td>
          </tr>
        </thead>
        <tbody className="border text-center h-20 font-serif">
          {users.map((user) => {
            return (
              <tr>
                <td>1</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>{user.message}</td>
                <td>
                  <button
                    className="bg-[#4AA4D9] py-1 px-2 text-white rounded-lg "
                    onClick={() =>
                      handleEmailSendClick(user.name, user.email, user.message)
                    }
                  >
                    {isloading ? "loading..." : "Send Email"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
