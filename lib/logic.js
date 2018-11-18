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

//'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Change Donation transaction
 * @param {org.donation.network.ChangeDonationValue} changeDonationValue
 * @transaction
 */
async function changeDonationValue(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.donation.network.Donation');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.donation.network', 'DonationValueEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

/**
 * Buy Aid Item transaction
 * @param {org.donation.network.BuyAidItem} buyAidItem 
 * @transaction
 */
async function buyAidItem(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.aidItem;

    // Update the asset with the new value.
    tx.asset.aidItem = tx.newAidItem;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.donation.network.Donation');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.donation.network', 'AidItemEvent');
    event.asset = tx.asset;
    event.oldAidItem = oldValue;
    event.newAidItem = tx.newAidItem;
    emit(event);
}

/**
 * Change transaction
 * @param {org.donation.network.ChangeCampaign} changeCampaign - the Change transaction
 * @transaction
 */
async function changeCampaign(tx) {

    const participantRegistry =await getParticipantRegistry('org.donation.network.Campaign')
    if (participantRegistry.exists(tx.newCampaign.getIdentifier()))
    {
    // Update the asset with the new value.
    tx.asset.campaign = tx.newCampaign;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.donation.network.Donation');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.donation.network', 'ChangeEvent');
    event.asset = tx.asset;
    //event.oldValue = oldCampaign;
    event.newValue = tx.newCampaign;
    emit(event);
    }
    else{
        throw new error('denied: campaign does not exist');
    }

}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.donation.network.SetupEnv} setupEnv - the SetupDemo transaction
 * @transaction
 */

 
async function setupEnv(){
    const factory = getFactory();
    const NS = 'org.donation.network';

    const donator = factory.newResource(NS, 'Donator', 'donator@gmail.com');
    //const donatorAddress = factory.newConcept(NS, 'Address');
    //donatorAddress.country = 'Ireland';
    //donator.address = donatorAddress;
    donator.donatorID = "DONATOR001";

    const charityOrg = factory.newResource(NS, 'CharityOrg', 'oxfam@gmail.com');
    //const charityAddress = factory.newConcept(NS, 'Address');
    //charityAddress.country = 'Ireland';
    //charityOrg.address = charityAddress;
    charityOrg.charityID = "CHAR001";
    const charityOrg2 = factory.newResource(NS, 'CharityOrg', 'alone@gmail.com');
    //const charityAddress = factory.newConcept(NS, 'Address');
    //charityAddress.country = 'Ireland';
    //charityOrg.address = charityAddress;
    charityOrg2.charityID = "CHAR002";

    const campaign = factory.newResource(NS, 'Campaign', 'CAM001');
    campaign.campaignName= "Haiti Appeal";

    const campaign2 = factory.newResource(NS, 'Campaign', 'CAM002')
    campaign2.campaignName= "Libya";

    const donation = factory.newResource(NS, 'Donation', 'DON001');
    donation.donator = factory.newRelationship(NS,'Donator', 'donator@gmail.com');
    donation.charityOrg = factory.newRelationship(NS, 'CharityOrg','oxfam@gmail.com');
    donation.campaign = factory.newRelationship(NS, 'Campaign', 'CAM001')
    donation.value = 300;

    const donation2 = factory.newResource(NS, 'Donation', 'DON002');
    donation2.donator = factory.newRelationship(NS,'Donator', 'donator2@gmail.com');
    donation2.charityOrg = factory.newRelationship(NS, 'CharityOrg','alone@gmail.com');
    donation2.campaign = factory.newRelationship(NS, 'Campaign', 'CAM002');
    donation2.value = 200;
    
    const regulator = factory.newResource(NS, 'Regulator', 'cri@gmail.com');
    regulator.regulatorName= "CCI";
    regulator.regulatorID = "REG001";


    const donatorRegistry = await getParticipantRegistry(NS + '.Donator');
    await donatorRegistry.addAll([donator]);

    const charityOrgRegistry = await getParticipantRegistry(NS + '.CharityOrg');
    await charityOrgRegistry.addAll([charityOrg]);
    await charityOrgRegistry.addAll([charityOrg2]);

    const campaignRegistry = await getParticipantRegistry(NS + '.Campaign');
    await campaignRegistry.addAll([campaign]);
    await campaignRegistry.addAll([campaign2]);
    
    const donationRegistry = await getAssetRegistry(NS + '.Donation');
    await donationRegistry.addAll([donation]);

//    donationRegistry = await getAssetRegistry(NS + '.Donation');
    await donationRegistry.addAll([donation2]);

    const regulatorRegistry = await getParticipantRegistry(NS + '.Regulator');
    await regulatorRegistry.addAll([regulator]);
}