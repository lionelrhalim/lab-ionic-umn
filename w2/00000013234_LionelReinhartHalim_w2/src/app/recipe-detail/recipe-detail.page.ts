import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})

export class RecipeDetailPage implements OnInit {

    loadedRecipe: Recipe;

    constructor(
        private activatedRoute: ActivatedRoute,
        private recipesService: RecipesService,
        private router: Router,
        private alertController: AlertController,
        private toastController: ToastController,
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            paramMap => {
                if (!paramMap.has('recipeId')) {
                    return;
                }

                this.loadedRecipe = this.recipesService.getRecipe(paramMap.get('recipeId'));
            }
        )
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Delete Recipe',
            message: 'Are you sure you want to delete this recipe?',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => this.deleteRecipe()
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });

        await alert.present();
    }

    async presentToast(action: string) {
        const toast = await this.toastController.create({
            message: 'Recipe has been ' + action + '.',
            duration: 2000
        });

        await toast.present();
    }

    deleteRecipe() {
        this.presentToast('deleted');

        this.recipesService.deleteRecipe(this.loadedRecipe.id);
        this.router.navigate(['./recipes']);
    }
}
