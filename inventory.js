// class Inventory {
//     constructor(x, y, w, h) {
//       this.x = x; 
//       this.y = y; 
//       this.w = w; 
//       this.h = h;
//       this.color = "rgba(255, 255, 255, 0.5)";
//       this.items = new Array();
//       this.columns = 4;
//     }

//     addItem(sprite) {
//         // this.items.push(item);
//         // if inventory is full then cannot add items
//         if (this.items.length == this.columns) {
//             sprite.vy = -4; // max of 4
//             return false;
//           }
//           // otherwise add item if it is emptyt
//           this.items.push(sprite);
//           return true;
//     }

//     // remove an item from the inventory
//     removeItem(itemIndex) {
//         this.items.splice(itemIndex, 1);
//         // var item = this.items[index];
//         //   if (item) {
//         //     this.items.splice(index, 1);
//         //     item.x = x;
//         //     item.y = y - item.h;
//         //     item.vx = Math.random() * 2 - 1;
//         //     item.vy = Math.random() * -5 - 1;
//         //   } 
//         //   return item;
//         // }
//     }

//     draw(ctx) {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.w, this.h);
//     }
// }


