//
//  oApp.swift
//  Shared
//
//  Created by 向 宇 on 2021/01/06.
//

import SwiftUI

@main
struct oApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
