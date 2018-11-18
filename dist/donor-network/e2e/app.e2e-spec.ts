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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for donor-network', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be donor-network', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('donor-network');
    })
  });

  it('network-name should be donor-network@0.0.4',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('donor-network@0.0.4.bna');
    });
  });

  it('navbar-brand should be donor-network',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('donor-network');
    });
  });

  
    it('Donation component should be loadable',() => {
      page.navigateTo('/Donation');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Donation');
      });
    });

    it('Donation table should have 7 columns',() => {
      page.navigateTo('/Donation');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Donator component should be loadable',() => {
      page.navigateTo('/Donator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Donator');
      });
    });

    it('Donator table should have 3 columns',() => {
      page.navigateTo('/Donator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('CharityOrg component should be loadable',() => {
      page.navigateTo('/CharityOrg');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('CharityOrg');
      });
    });

    it('CharityOrg table should have 3 columns',() => {
      page.navigateTo('/CharityOrg');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Campaign component should be loadable',() => {
      page.navigateTo('/Campaign');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Campaign');
      });
    });

    it('Campaign table should have 3 columns',() => {
      page.navigateTo('/Campaign');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });
  
    it('Regulator component should be loadable',() => {
      page.navigateTo('/Regulator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Regulator');
      });
    });

    it('Regulator table should have 4 columns',() => {
      page.navigateTo('/Regulator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('ChangeDonationValue component should be loadable',() => {
      page.navigateTo('/ChangeDonationValue');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeDonationValue');
      });
    });
  
    it('ChangeCampaign component should be loadable',() => {
      page.navigateTo('/ChangeCampaign');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ChangeCampaign');
      });
    });
  
    it('BuyAidItem component should be loadable',() => {
      page.navigateTo('/BuyAidItem');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('BuyAidItem');
      });
    });
  
    it('SetupEnv component should be loadable',() => {
      page.navigateTo('/SetupEnv');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetupEnv');
      });
    });
  

});