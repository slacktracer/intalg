export default function process (array, identify) {

  return array.map(function (item, index) {

    const processedItem = { begin: item.begin, end: item.end, type: item.type }

    if (identify) {

      processedItem.id = index

    } else {

      delete processedItem.id

    }

    return processedItem

  })

}
