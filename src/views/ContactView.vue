<template>
  <footer id="contact-page">
    <div class="contact-container">
      <div class="contact-item">
        <div class="contact-heading">
          <h3>Get in touch with me.</h3>
        </div>
        <div class="form">
          <form
            id="contact-form"
            target="_blank"
            @submit.prevent="handleSubmit"
          >
            <div class="form-group">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Your email"
                name="_replyto"
                required
                class="shadow"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea
                name="textarea"
                placeholder="Your message"
                required
                v-model="message"
                class="shadow"
              ></textarea>
            </div>
            <div class="form-button">
              <button type="submit" class="submit-btn shadow">Submit</button>
            </div>
          </form>
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
      email: "",
      message: "",
    };
  },
  methods: {
    handleSubmit() {
      fetch("https://final-blog-api.herokuapp.com/contact", {
        method: "POST",
        body: JSON.stringify({
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
  width: 60%;
  justify-content: center;
  align-items: center;
}
.contact-item {
  width: 50%;
  color: #fff;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  row-gap: 1rem;
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
  background: whitesmoke;
  color: #000;
  transition: ease-in-out 500ms;
}
.submit-btn:hover {
  background: blueviolet;
  color: #fff;
}
.form-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
}
.form-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
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
  min-width: 300px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-weight: 600;
  color: #fff;
}
#contact-form input::placeholder,
textarea::placeholder {
  color: #000;
}
#contact-form input {
  height: 40px;
  padding: 10px;
}
#contact-form textarea {
  height: 60px;
  padding: 10px;
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
  #contact-form input,
  textarea {
    min-width: 250px;
    font-weight: 600;
  }
  .form-group {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
  }
  .form-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
  }
}
</style>
