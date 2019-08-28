import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})

export class RecipeDetailPage implements OnInit {

    loadedRecipe: Recipe;

    constructor(private activatedRoute: ActivatedRoute, private recipesService: RecipesService) {}

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

}
