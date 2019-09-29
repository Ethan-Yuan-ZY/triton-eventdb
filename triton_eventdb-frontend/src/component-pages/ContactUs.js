import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "./ContactUs.css";

export default class ContactUsPage extends Component {
  render() {
    return (
      <div className="contact-us-page-main-container-div">
        <div className="contact-us-page-background-div"></div>
        <div className="contact-us-page-content-main-div">
          <div className="contact-us-page-form-main-div">
            <p>What would you like to do?</p>
            <FormControl component="fieldset">
              <RadioGroup aria-label="contact" name="contact-option">
                <FormControlLabel
                  value="contact-triton-eventdb"
                  control={<Radio />}
                  label="Contact the triton eventDB"
                />
                <FormControlLabel
                  value="add-newsletter"
                  control={<Radio />}
                  label="Add me to Newsletter"
                />
                <FormControlLabel
                  value="share-event-news"
                  control={<Radio />}
                  label="Share Event News"
                />
                <FormControlLabel
                  value="advertise-event"
                  control={<Radio />}
                  label="Advertise an Event"
                />
              </RadioGroup>
            </FormControl>
            <Divider />

            <div>
              <p>Triton EventDB Mailing Address</p>
              <div className="contact-us-page-address-header-divider">
                <p className="contact-us-page-address-header-divider-para-1"></p>
                <p className="contact-us-page-address-header-divider-para-2"></p>
              </div>
              <p>Attn: Triton EventDB</p>
              <p>9500 Nobel Drive</p>
              <p>La Jolla, CA 92093</p>
              <p>Random Building</p>
              <p>Ste 2606</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
