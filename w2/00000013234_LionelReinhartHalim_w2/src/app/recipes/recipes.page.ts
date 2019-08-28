import {Component, OnInit} from '@angular/core';
import { Recipe } from "./recipe.model";
import {RecipesService} from "./recipes.service";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.page.html',
    styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {

    recipes: Recipe[];

    constructor(
        private recipeService: RecipesService,
    ) {}

    ngOnInit() {
        this.recipes = this.recipeService.getAllRecipes();
    }

    ionViewDidEnter() {
        this.recipes = this.recipeService.getAllRecipes();
    }

    getRecipe(recipeId: string) {
        let recipe = this.recipeService.getRecipe(recipeId);
        console.log(recipe);
    }

    deleteRecipe(recipeId: string) {
        this.recipes = this.recipes.filter(recipe => recipe.id != recipeId)
    }
}
