import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'gender-select',
    loadChildren: () => import('./pages/gender-select/gender-select.module').then(m => m.GenderSelectPageModule)
  },
  {
  path: 'mode-select',
  loadChildren: () => import('./pages/mode-select/mode-select.module').then(m => m.ModeSelectPageModule)
  },
  {
    path: 'input-form',
    loadChildren: () => import('./pages/input-form/input-form.module').then(m => m.InputFormPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then(m => m.ResultPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'mode-select',
    loadChildren: () => import('./pages/mode-select/mode-select.module').then( m => m.ModeSelectPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}