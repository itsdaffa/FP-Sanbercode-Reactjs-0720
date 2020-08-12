import React from "react";
import "./assets/style.css";

const Contact = () => {
  return (
    <div>
      <section id="top">
        <h1>Hubungi Kami</h1>
        <p>
          <strong>Kantor: </strong> di jalan belum jadi <br />
          <strong>Nomor Telepon: </strong> 08XX-XXXX <br />
          <strong>Email: </strong> email@work.com <br />
        </p>
      </section>
      <section id="bottom">
        <h1>Kirimkan Pesan</h1>
        <form action="index.html">
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="nama">
                    <strong>Nama</strong>
                  </label>
                </td>
                <td>
                  <input type="text" id="nama" name="nama" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">
                    <strong>Email</strong>
                  </label>
                </td>
                <td>
                  <input type="text" id="email" name="email" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="gender">
                    <strong>Jenis Kelamin</strong>
                  </label>
                </td>
                <td>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    defaultValue="male"
                  />
                  <label htmlFor="male">Laki-laki</label>
                  <br />
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    defaultValue="female"
                  />
                  <label htmlFor="female">Perempuan</label>
                  <br />
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    defaultValue="other"
                  />
                  <label htmlFor="other">Gender is a social construct</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="msg">
                    <strong>Pesan Anda</strong>
                  </label>
                </td>
                <td>
                  <textarea
                    id="msg"
                    rows={5}
                    cols={60}
                    name="msg"
                    defaultValue={""}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" defaultValue="Kirim" />
        </form>
      </section>
    </div>
  );
};

export default Contact;
