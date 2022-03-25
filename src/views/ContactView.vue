<template>
  <footer id="contact-page">
    <div class="contact-container">
      <div class="contact-item">
        <div class="contact-heading">
          <h3>Contact Us</h3>
        </div>
        <div class="form">
          <form
            id="contact-form"
            target="_blank"
            @submit.prevent="handleSubmit"
          >
            <label>Name</label>
            <input type="text" placeholder="Name" required v-model="name" />
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Email"
              name="_replyto"
              required
              v-model="email"
            />
            <label>Message</label>
            <textarea
              name="textarea"
              placeholder="Message"
              required
              v-model="message"
            ></textarea>
            <button type="submit" class="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <div class="social-item">
        <div class="social-heading">
          <h3>Let's Get Social</h3>
        </div>
        <div class="social-icons">
          <a
            class="s-item"
            href="https://www.linkedin.com/in/nadeem-johnson-57b388224/"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="30"
              height="30"
              data-prefix="fab"
              data-icon="linkedin"
              class="svg-inline--fa fa-linkedin"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
              ></path>
            </svg>
            <h5>Linkedin</h5>
          </a>
          <a
            class="s-item"
            href="https://github.com/RoyalAdvisor"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="30"
              height="30"
              data-prefix="fab"
              data-icon="github"
              class="svg-inline--fa fa-github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              ></path>
            </svg>
            <h5>Github</h5>
          </a>
          <a
            class="s-item"
            href="https://codepen.io/royaladvisor"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              width="30"
              height="30"
              data-prefix="fab"
              data-icon="codepen"
              class="svg-inline--fa fa-codepen"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M502.3 159.7l-234-156c-7.987-4.915-16.51-4.96-24.57 0l-234 156C3.714 163.7 0 170.8 0 177.1v155.1c0 7.143 3.714 14.29 9.715 18.29l234 156c7.987 4.915 16.51 4.96 24.57 0l234-156c6-3.999 9.715-11.14 9.715-18.29V177.1c-.001-7.142-3.715-14.29-9.716-18.28zM278 63.13l172.3 114.9-76.86 51.43L278 165.7V63.13zm-44 0v102.6l-95.43 63.72-76.86-51.43L234 63.13zM44 219.1l55.14 36.86L44 292.8v-73.71zm190 229.7L61.71 333.1l76.86-51.43L234 346.3v102.6zm22-140.9l-77.71-52 77.71-52 77.71 52-77.71 52zm22 140.9V346.3l95.43-63.72 76.86 51.43L278 448.8zm190-156l-55.14-36.86L468 219.1v73.71z"
              ></path>
            </svg>
            <h5>Codepen</h5>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <h6 class="copyright">Copyright © 2022 The Mental Mind</h6>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ContactView",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    handleSubmit() {
      fetch("https://final-blog-api.herokuapp.com/contact", {
        method: "POST",
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => alert((json.msg = "Form has been submitted")))
        .catch((err) => alert((err.msg = "Form has failed")));
    },
  },
};
</script>

<style scoped>
.blog-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  margin: 0;
  width: 100%;
}
.footer-copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
}
.copyright {
  color: #fff;
  font-size: 12px;
  margin: 0;
}
* {
  box-sizing: border-box;
  scroll-behavior: smooth;
}
footer {
  display: flex;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  flex-wrap: wrap;
  flex-direction: column;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.contact-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 60%;
  column-gap: 5rem;
  justify-content: space-between;
  align-items: flex-start;
}
.contact-item {
  width: 50%;
  color: #fff;
  padding: 0;
}
.contact-item h3 {
  font-size: 20px;
  color: #fff;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
label {
  font-size: 15px;
  color: #fff;
  font-weight: 600;
}
.submit-btn {
  min-width: 80px;
  padding: 5px;
  outline: none;
  border: none;
  background: #fff;
  color: #000;
  transition: ease-in-out 500ms;
}
.submit-btn:hover {
  background: blueviolet;
  color: #fff;
}
#contact-form {
  width: 100%;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
#contact-form input,
textarea {
  width: 60%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-weight: 600;
}
#contact-form input {
  height: 40px;
  padding: 10px;
}
#contact-form textarea {
  height: 80px;
  padding: 10px;
}
#contact-form input::placeholder {
  font-weight: 600;
}
#contact-form textarea::placeholder {
  font-weight: 600;
}
.social-item {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 2rem;
  width: 40%;
  color: #696969;
  padding: 0;
}
.social-item h3 {
  font-size: 20px;
  color: #fff;
}
.social-icons {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 0.5rem;
  flex-wrap: wrap;
}
.s-item {
  text-decoration: none;
  color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transition: 200ms ease-in-out;
}
.s-item:hover {
  color: blueviolet;
}
.s-item h5 {
  color: #696969;
  line-height: 25px;
  font-size: 15px;
  padding: 0;
  transition: 200ms ease-in-out;
}
.s-item h5:hover {
  color: blueviolet;
}
@media only screen and (max-width: 770px) {
  .contact-container {
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  .contact-item {
    width: 95%;
  }
  .social-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
    width: 95%;
    padding: 0;
  }
  #contact-form input,
  textarea {
    width: 50%;
    font-weight: 600;
  }
}
@media only screen and (max-width: 576px) {
  .contact-container {
    margin: 2rem 0;
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  .contact-item {
    width: 95%;
    padding: 0;
  }
  .social-item {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
    width: 95%;
    padding: 0;
  }
  .social-icons {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }
  #contact-form input,
  textarea {
    width: 100%;
    border: none;
    font-weight: 600;
  }
}
</style>
