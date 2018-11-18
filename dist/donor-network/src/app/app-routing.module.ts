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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DonationComponent } from './Donation/Donation.component';

import { DonatorComponent } from './Donator/Donator.component';
import { CharityOrgComponent } from './CharityOrg/CharityOrg.component';
import { CampaignComponent } from './Campaign/Campaign.component';
import { RegulatorComponent } from './Regulator/Regulator.component';

import { ChangeDonationValueComponent } from './ChangeDonationValue/ChangeDonationValue.component';
import { ChangeCampaignComponent } from './ChangeCampaign/ChangeCampaign.component';
import { BuyAidItemComponent } from './BuyAidItem/BuyAidItem.component';
import { SetupEnvComponent } from './SetupEnv/SetupEnv.component';
import { InfoComponent} from './info/info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Donation', component: DonationComponent },
  { path: 'Donator', component: DonatorComponent },
  { path: 'CharityOrg', component: CharityOrgComponent },
  { path: 'Campaign', component: CampaignComponent },
  { path: 'Regulator', component: RegulatorComponent },
  { path: 'ChangeDonationValue', component: ChangeDonationValueComponent },
  { path: 'ChangeCampaign', component: ChangeCampaignComponent },
  { path: 'BuyAidItem', component: BuyAidItemComponent },
  { path: 'SetupEnv', component: SetupEnvComponent },
  { path: 'info', component: InfoComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
