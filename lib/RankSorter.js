/**
 * Helper class to sort items in non-decreasing rank order.
 */
var Guard = require('./Guard');
var MathUtils = require('./numerics/MathUtils');

/**
 * Returns a list of all the elements in items, sorted in non-descending
 * order, according to itemRanks. Uses a stable sort, and also sorts
 * itemRanks (in place)
 *
 * @param items
 *			The items to sort according to the order specified by ranks.
 * @param ranks
 *			The ranks for each item where 1 is first place.
 * @return the items sorted according to their ranks
 */
exports.sort = function(items, itemRanks) {
	Guard.argumentNotNull(items, "items");
	Guard.argumentNotNull(itemRanks, "itemRanks");

	var sortedResults = {
		items: items,
		itemRanks: itemRanks
	};
	var lastObserverdRank = 0;
	var needToSort = false;

	for (var i = 0; i < itemRanks.length; i++) {
		var currentRank = itemRanks[i];
		// We're expecting ranks to go up (e.g. 1, 2, 2, 3, ...)
		// If it goes down, then we've got to sort it.
		if (currentRank < lastObserverdRank) {
			needToSort = true;
			break;
		}

		lastObserverdRank = currentRank;
	}

	if (needToSort) {
		// Get the existing items as an indexable list.
		var itemsInList = new Array(items.length);
		itemsInList = MathUtils.arrayCopy(items, 0, itemsInList, 0, items.length);

		// item -> rank map
		var itemToRankMap = {};
		for (var j = 0; j < itemsInList.length; j++) {
			itemToRankMap[itemsInList[j]] = itemRanks[j];
		}

		itemsInList.sort(function(a, b) {
			var aRank = itemToRankMap[a];
			var bRank = itemToRankMap[b];
			if (aRank < bRank) {
				return -1;
			} else if (aRank > bRank) {
				return 1;
			} else {
				return 0;
			}
		});

		sortedResults.items = itemsInList;
		sortedResults.itemRanks = itemRanks.sort();
	}

	return sortedResults;
};
