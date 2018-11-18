import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.donation.network{
   export abstract class ChainUser extends Participant {
      email: string;
   }
   export class Donator extends ChainUser {
      donatorID: string;
   }
   export class CharityOrg extends ChainUser {
      charityID: string;
   }
   export class Campaign extends Participant {
      campaignID: string;
      campaignName: string;
   }
   export class Regulator extends ChainUser {
      regulatorID: string;
      regulatorName: string;
   }
   export class Donation extends Asset {
      donationId: string;
      donator: Donator;
      charityOrg: CharityOrg;
      value: number;
      campaign: Campaign;
      aidItem: string;
   }
   export class ChangeDonationValue extends Transaction {
      asset: Donation;
      newValue: number;
   }
   export class ChangeCampaign extends Transaction {
      asset: Donation;
      newCampaign: Campaign;
   }
   export class BuyAidItem extends Transaction {
      asset: Donation;
      newAidItem: string;
   }
   export class SetupEnv extends Transaction {
   }
   export class DonationValueEvent extends Event {
      asset: Donation;
      oldValue: number;
      newValue: number;
   }
   export class AidItemEvent extends Event {
      asset: Donation;
      oldAidItem: string;
      newAidItem: string;
   }
   export class ChangeEvent extends Event {
      asset: Donation;
      newValue: Campaign;
   }
// }
