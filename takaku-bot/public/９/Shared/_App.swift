//
//  _App.swift
//  Shared
//
//  Created by 向 宇 on 2021/01/13.
//

import SwiftUI

@main
struct _App: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
