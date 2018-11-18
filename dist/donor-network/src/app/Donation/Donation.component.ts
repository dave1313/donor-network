/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DonationService } from './Donation.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-donation',
  templateUrl: './Donation.component.html',
  styleUrls: ['./Donation.component.css'],
  providers: [DonationService]
})
export class DonationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  donationId = new FormControl('', Validators.required);
  donator = new FormControl('', Validators.required);
  charityOrg = new FormControl('', Validators.required);
  value = new FormControl('', Validators.required);
  campaign = new FormControl('', Validators.required);
  aidItem = new FormControl('', Validators.required);

  constructor(public serviceDonation: DonationService, fb: FormBuilder) {
    this.myForm = fb.group({
      donationId: this.donationId,
      donator: this.donator,
      charityOrg: this.charityOrg,
      value: this.value,
      campaign: this.campaign,
      aidItem: this.aidItem
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDonation.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.donation.network.Donation',
      'donationId': this.donationId.value,
      'donator': this.donator.value,
      'charityOrg': this.charityOrg.value,
      'value': this.value.value,
      'campaign': this.campaign.value,
      'aidItem': this.aidItem.value
    };

    this.myForm.setValue({
      'donationId': null,
      'donator': null,
      'charityOrg': null,
      'value': null,
      'campaign': null,
      'aidItem': null
    });

    return this.serviceDonation.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'donationId': null,
        'donator': null,
        'charityOrg': null,
        'value': null,
        'campaign': null,
        'aidItem': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.donation.network.Donation',
      'donator': this.donator.value,
      'charityOrg': this.charityOrg.value,
      'value': this.value.value,
      'campaign': this.campaign.value,
      'aidItem': this.aidItem.value
    };

    return this.serviceDonation.updateAsset(form.get('donationId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceDonation.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceDonation.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'donationId': null,
        'donator': null,
        'charityOrg': null,
        'value': null,
        'campaign': null,
        'aidItem': null
      };

      if (result.donationId) {
        formObject.donationId = result.donationId;
      } else {
        formObject.donationId = null;
      }

      if (result.donator) {
        formObject.donator = result.donator;
      } else {
        formObject.donator = null;
      }

      if (result.charityOrg) {
        formObject.charityOrg = result.charityOrg;
      } else {
        formObject.charityOrg = null;
      }

      if (result.value) {
        formObject.value = result.value;
      } else {
        formObject.value = null;
      }

      if (result.campaign) {
        formObject.campaign = result.campaign;
      } else {
        formObject.campaign = null;
      }

      if (result.aidItem) {
        formObject.aidItem = result.aidItem;
      } else {
        formObject.aidItem = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'donationId': null,
      'donator': null,
      'charityOrg': null,
      'value': null,
      'campaign': null,
      'aidItem': null
      });
  }

}
